#!/bin/bash

# File name
FILE="package.json"

# Check if file exists
if [ ! -f "$FILE" ]; then
    echo "Error: $FILE does not exist."
    exit 1
fi

# Extract current version
current_version=$(grep '"version":' $FILE | sed -E 's/.*"version": "([0-9]+\.[0-9]+\.[0-9]+)".*/\1/')

# Check if version is valid
if [[ ! $current_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Current version format is invalid."
    exit 1
fi

# Increment version
IFS='.' read -ra ADDR <<< "$current_version"
ADDR[2]=$((${ADDR[2]} + 1))
new_version="${ADDR[0]}.${ADDR[1]}.${ADDR[2]}"

# Update file
sed -i '' "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" $FILE

echo "Version updated from $current_version to $new_version"
