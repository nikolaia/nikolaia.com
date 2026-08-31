---
title: How to Keep Secrets from your Agent
description: Agents are taking your job, but can you at least keep your secrets? Lightning talk at JavaZone 2026, English.
author: Nikolai Norman Andersen
pubDatetime: 2026-08-31T12:00:00Z
featured: true
draft: false
tags:
  - talk
  - sops
  - secrets
canonicalURL: https://2026.javazone.no/program/c14b5db1-9c44-4258-a39d-70aadfb2c2e9/
---

Lightning talk at [JavaZone 2026](https://2026.javazone.no/program/c14b5db1-9c44-4258-a39d-70aadfb2c2e9/), English.

Handle secrets from SOPS-encrypted files, live Kubernetes Secrets, or config inside running pods without exposing plaintext.

```md
---
name: sops-secret-handling
description: Handle secrets from SOPS-encrypted files, live Kubernetes Secrets, or config inside running pods without exposing plaintext.
allowed-tools: Bash(sops:*), Bash(kubectl:*), Bash(ruby:*), Bash(yq:*), Bash(jq:*)
---

# Secret Handling

Use when a command needs a secret and plaintext must stay out of chat, shell history, git, long-lived files, screenshots, and debug logs. This covers SOPS-encrypted files, live `kubectl get secret` reads, and config files sitting inside a running pod or container — the discipline is the same regardless of where the secret lives: narrow the read to exactly what's needed before it leaves the source, and keep extraction and command execution in the same step.

## Default Choices

- Use `sops exec-env` when the target process can read env vars or stdin.
- Use `sops exec-file` when the target process only accepts a file path.
- For live Kubernetes Secrets or in-pod config, pull the value straight into a shell variable inside a single `kubectl` invocation and pipe it directly to the next command — don't let it land in a separate step where it could be echoed or logged.
- Keep parsing and command execution inside the same exec call as the read.
- Prefer structured parsers (`yq`, `jq`, `ruby -ryaml`) over text scraping for YAML or JSON secrets.

## Narrow the Read

A file or Secret rarely holds only the value you're after. A broad read to hunt for one key risks pulling everything else in the file into the open too — that's a failure mode independent of whether the source is SOPS-encrypted.

- Never dump a whole file (`cat config.yaml`) or use a broad context grep (`grep -A10 database:`) to find one value. Both can capture unrelated secrets sitting in the same file and put them in the transcript.
- Anchor extraction precisely to the key you need — e.g. `sed -n '/^database:/,/^[a-z]/p'` bounded to the next top-level key, or a structured parser (`yq '.database'`) that returns only that subtree.
- This applies to every read path: `kubectl exec ... cat`, `kubectl get secret -o jsonpath`, `docker exec ... cat`, `ssh ... cat` are all the same failure mode as an unscoped `sops exec-file` if the read isn't bounded.
- If a narrow query comes back empty or errors, fix it — don't widen the read to "just see what's there." A broad dump to debug a broken query defeats the point of narrowing. Prefer a structured parser (`jq`, `yq`) over retrying broken `jsonpath` syntax.
- Example: `jsonpath` dotted-path escaping doesn't work for keys containing dots — e.g. annotation/label keys like `kustomize.toolkit.fluxcd.io/prune` need bracket syntax (`annotations['kustomize\.toolkit\.fluxcd\.io/prune']`). Simpler and more reliable: pipe to `jq` scoped to `.metadata`, e.g. `kubectl get secret NAME -n NS -o json | jq '.metadata.annotations'` — this also keeps `.data` out of the result.

## Reference Map

- Read `references/runbook.md` for command patterns, browser automation, temp-file tradeoffs, and security notes.

## Guardrails

- Never print decrypted or live-fetched values with `echo`, `env`, `printenv`, `cat`, screenshots, or debug logs unless the user explicitly asks for plaintext.
- Never let a decrypted or live-fetched value enter a subagent's prompt, task description, or transcript — a subagent's context is sent to the model provider too, same as this agent's. Keep secret-consuming commands inside a single exec call; don't delegate that step.
- Never pass secrets as plain command arguments when stdin or env is available.
- Never copy decrypted or live-fetched secrets into tracked files.
- Before modifying encrypted secret files in a repo, check for `.sops.yaml`; stop if it is missing.
- If only validating keys or presence, inspect presence without printing values.
```
