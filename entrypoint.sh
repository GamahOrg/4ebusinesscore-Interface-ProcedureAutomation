#!/bin/sh

echo "🧪 Injecting runtime environment variables..."

TARGET_DIR="/app/procedureautomation"
mkdir -p "$TARGET_DIR"

# Begin env.js
echo "window._env_ = {" > "$TARGET_DIR/env.js"

# Inject PUBLIC_URL if present
if [ -n "$PUBLIC_URL" ]; then
  echo "  \"PUBLIC_URL\": \"${PUBLIC_URL}\"," >> "$TARGET_DIR/env.js"
fi

if [ -n "$SUB_SYSTEM_ID" ]; then
  echo "  \"SUB_SYSTEM_ID\": \"${SUB_SYSTEM_ID}\"," >> "$TARGET_DIR/env.js"
fi

# Inject NODE_ENV if present
if [ -n "$NODE_ENV" ]; then
  echo "  \"NODE_ENV\": \"${NODE_ENV}\"," >> "$TARGET_DIR/env.js"
fi

# Include all REACT_APP_ variables
env | grep '^REACT_APP_' | while IFS='=' read -r name value; do
  echo "  \"$name\": \"${value}\"," >> "$TARGET_DIR/env.js"
done

# End of env.js
echo "};" >> "$TARGET_DIR/env.js"

echo "✅ env.js created at $TARGET_DIR/env.js"
echo "🚀 Serving build from $TARGET_DIR on port 3000..."

serve -s "$TARGET_DIR" -l 3000
