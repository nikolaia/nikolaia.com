---
title: azctx — kubectx for the Azure CLI
description: A kubectx-inspired fish function for using different Azure accounts in different shells.
author: Nikolai Norman Andersen
pubDatetime: 2026-10-06T08:00:00Z
featured: false
draft: false
tags:
  - azure
  - fish
---

A kubectx-inspired way of using different Azure accounts in different shells, without running `az login` every time you switch. Each folder in `~/.azure-profiles` is a context, and `azctx` points `AZURE_CONFIG_DIR` at one of them for the current shell only.

```fish
# ~/.config/fish/functions/azctx.fish
#
# usage: azctx [name | -n name | -c | - | -h]
#
#   azctx            pick a context with fzf
#   azctx <name>     switch to an existing context
#   azctx -n <name>  create a new context and switch to it
#   azctx -c         print the current context
#   azctx -          go back to the default ~/.azure
#
# Contexts are folders in ~/.azure-profiles (set as AZURE_CONFIG_DIR).

function azctx --description="Switch az CLI context (AZURE_CONFIG_DIR) for this shell"
    set -l base ~/.azure-profiles
    set -l name $argv[1]

    switch "$name"
        case ""
            set name (command ls $base 2>/dev/null | fzf --height 40% --reverse \
                --prompt "az context> " \
                --header "active: "(azctx -c))
            or return
        case -h --help
            echo "usage: azctx [name | -n name | -c | - | -h]"
            echo
            echo "  azctx            pick a context with fzf"
            echo "  azctx <name>     switch to an existing context"
            echo "  azctx -n <name>  create a new context and switch to it"
            echo "  azctx -c         print the current context"
            echo "  azctx -          go back to the default ~/.azure"
            echo
            echo "Contexts are folders in ~/.azure-profiles (set as AZURE_CONFIG_DIR)."
            return
        case -
            set -e AZURE_CONFIG_DIR
            echo "Using default ~/.azure"
            return
        case -c
            if set -q AZURE_CONFIG_DIR
                basename $AZURE_CONFIG_DIR
            else
                echo default
            end
            return
        case -n
            if test -z "$argv[2]"
                echo "usage: azctx -n <name>" >&2
                return 2
            end
            if test -d $base/$argv[2]
                echo "azctx: context '$argv[2]' already exists" >&2
                return 1
            end
            mkdir -p $base/$argv[2]
            set -gx AZURE_CONFIG_DIR $base/$argv[2]
            echo "Created context '$argv[2]', run: az login"
            return
    end

    if not test -d $base/$name
        echo "azctx: no context named '$name'" >&2
        return 1
    end
    set -gx AZURE_CONFIG_DIR $base/$name
    az account show --query "{user:user.name, sub:name}" -o tsv 2>/dev/null
    or echo "Not logged in to '$name', run: az login"
end
