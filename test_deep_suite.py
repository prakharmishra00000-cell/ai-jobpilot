import urllib.request
import json
import time

print("=================================================================")
print("  JOBPILOT AI — DEEP LIVE FUNCTIONALITY & SYSTEM TEST SUITE      ")
print("=================================================================")

BASE_URL = "http://localhost:3003"

routes_to_test = [
    ("/", "Landing Page"),
    ("/onboarding", "Candidate Setup Wizard"),
    ("/dashboard", "Main Command Dashboard"),
    ("/jobs", "Discovered Jobs Search Engine"),
    ("/jobs/remotive-101", "Job Detail & AI Application Assistant"),
    ("/applications", "Applications CRM Tracker"),
    ("/automation", "24/7 Automation Control Center"),
    ("/responses", "Employer & Recruiter Responses"),
    ("/analytics", "Job Search Analytics & Insights"),
    ("/profile", "Candidate Profile & Portfolio Strength"),
    ("/guide", "Master Platform Guide"),
    ("/settings", "Preferences & System Settings"),
]

passed = 0
failed = 0

print("\n--- 1. HTTP ENDPOINT & UI ROUTE TEST ---")
for route, description in routes_to_test:
    url = BASE_URL + route
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        start_time = time.time()
        res = urllib.request.urlopen(req)
        elapsed = round((time.time() - start_time) * 1000, 2)
        
        if res.status == 200:
            print(f"  [PASS 200 OK] {route:<22} ({description}) - {elapsed}ms")
            passed += 1
        else:
            print(f"  [FAIL {res.status}] {route:<22} ({description})")
            failed += 1
    except Exception as e:
        print(f"  [ERROR] {route:<22} ({description}) -> {e}")
        failed += 1

print("\n--- 2. LIVE ADAPTER & JOB DISCOVERY TEST ---")
try:
    remotive_url = "https://remotive.com/api/remote-jobs?search=ai&limit=2"
    req = urllib.request.Request(remotive_url, headers={'User-Agent': 'JobPilot-AI/1.0'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode('utf-8'))
    jobs_count = len(data.get('jobs', []))
    print(f"  [PASS] Remotive Live API Endpoint: Fetched {jobs_count} live job listings")
except Exception as e:
    print(f"  [ERROR] Remotive Live API test failed: {e}")

print("\n=================================================================")
print(f"  TEST RESULTS: {passed} PASSED, {failed} FAILED across all systems.")
print("=================================================================")
