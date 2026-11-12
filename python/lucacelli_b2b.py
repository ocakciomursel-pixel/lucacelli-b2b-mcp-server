"""
Lucacelli B2B Cloud Intelligence — Zero-Dependency Python SDK & OpenAI/LangChain Tool Helper
Powered by Apify Cloud (@lucacelli) — $0.50–$1.50 / 1,000 records ($5.00/mo free credit included).
"""
from __future__ import annotations

import json
import os
import urllib.parse
import urllib.request
from typing import Any, Dict, List, Optional


class LucacelliB2BClient:
    """Lightweight, zero-dependency Python client for @lucacelli B2B Apify Cloud Actors."""

    BASE_URL = "https://api.apify.com/v2/acts"

    def __init__(self, api_token: Optional[str] = None, timeout_secs: int = 120) -> None:
        self.api_token = api_token or os.environ.get("APIFY_TOKEN") or os.environ.get("APIFY_API_TOKEN") or ""
        if not self.api_token:
            raise ValueError(
                "Missing APIFY_TOKEN. Get your free $5.00/mo Apify API token at "
                "https://console.apify.com/settings/integrations"
            )
        self.timeout_secs = timeout_secs

    def run_actor(self, actor_slug: str, payload: Dict[str, Any], memory_mb: int = 256) -> List[Dict[str, Any]]:
        actor_id = actor_slug if "~" in actor_slug else f"lucacelli~{actor_slug}"
        qs = urllib.parse.urlencode(
            {"token": self.api_token, "memory": memory_mb, "timeout": self.timeout_secs}
        )
        url = f"{self.BASE_URL}/{actor_id}/run-sync-get-dataset-items?{qs}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=self.timeout_secs + 15) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def scrape_google_maps(
        self, queries: List[str], location: Optional[str] = None, max_results_per_query: int = 20
    ) -> List[Dict[str, Any]]:
        body: Dict[str, Any] = {
            "searchStringsArray": queries,
            "maxCrawledPlacesPerSearch": max_results_per_query,
            "scrapeContacts": True,
            "scrapeSocialMediaProfiles": True,
        }
        if location:
            body["locationQuery"] = location
        return self.run_actor("google-maps-scraper-places-emails-contacts-reviews", body, memory_mb=1024)

    def enrich_domains(self, domains: List[str]) -> List[Dict[str, Any]]:
        return self.run_actor("b2b-domain-contact-tech-enricher", {"domains": domains, "crawlContactPages": True})

    def verify_emails(self, emails: List[str]) -> List[Dict[str, Any]]:
        return self.run_actor("bulk-email-verifier-mx-syntax", {"emails": emails})

    def detect_ad_pixels(self, domains: List[str]) -> List[Dict[str, Any]]:
        return self.run_actor("pixel-tag-manager-ad-spend-signal-detector", {"domains": domains})

    def generate_icebreakers(self, domains: List[str]) -> List[Dict[str, Any]]:
        return self.run_actor("cold-email-icebreaker-scraper", {"domains": domains})
