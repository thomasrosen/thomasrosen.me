# download music data from private git repo

echo "✅ started build_data.sh";

# Load environment variables in order of precedence
if [ ! -z "$VERCEL_ENV" ] && [ -f ".env.${VERCEL_ENV}" ]; then
    echo "📥 Loading environment variables from .env.${VERCEL_ENV} file..."
    export $(grep -v '^#' ".env.${VERCEL_ENV}" | xargs)
elif [ ! -z "$NODE_ENV" ] && [ -f ".env.${NODE_ENV}.local" ]; then
    echo "📥 Loading environment variables from .env.${NODE_ENV}.local file..."
    export $(grep -v '^#' ".env.${NODE_ENV}.local" | xargs)
elif [ -f .env.local ]; then
    echo "📥 Loading environment variables from .env.local file..."
    export $(grep -v '^#' .env.local | xargs)
elif [ ! -z "$NODE_ENV" ] && [ -f ".env.${NODE_ENV}" ]; then
    echo "📥 Loading environment variables from .env.${NODE_ENV} file..."
    export $(grep -v '^#' ".env.${NODE_ENV}" | xargs)
elif [ -f .env ]; then
    echo "📥 Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
else
    echo "⚠️ No environment file found, using environment variables directly"
fi

# Check if GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
    echo "❌ Error: GH_TOKEN environment variable is not set"
    echo "💡 Please set it in your .env file or environment"
    exit 1
fi

git config --global url."https://${GH_TOKEN}@github.com".insteadOf "https://github.com"

# check if git folder is cloned and can be updated or needs to be cloned
if [ ! -d "data_about_thomasrosen" ] ; then
    echo "📥 Cloning repository..."
    git clone "https://${GH_TOKEN}@github.com/thomasrosen/data_about_thomasrosen.git"
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to clone repository"
        exit 1
    fi
else
    echo "📥 Updating repository..."
    cd data_about_thomasrosen
    git pull
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to pull repository"
        exit 1
    fi
    cd ..
fi

echo "✅ done cloning";

# for development
mkdir -p ./src/data/music/playlists
cp -rp ./data_about_thomasrosen/music/playlists/* ./src/data/music/playlists
echo "✅ done copying playlists";

node ./scripts/build_music_metadata.js
echo "✅ done running build_music_metadata.js";

mkdir -p ./src/data/blog
cp -rp ./blog/ ./src/data/blog
echo "✅ done copying blog";

mkdir -p ./src/data/timeline
cp -rp ./data_about_thomasrosen/timeline/ ./src/data/timeline/
echo "✅ done copying timeline";

# node ./scripts/build_timeline.js
# echo "✅ done running build_timeline.js";

# maybe clean up the folder (but it's in gitignore, so can stay here to be faster in dev)
# rm -rf ./data_about_thomasrosen

echo "✅ finished build_data.sh";
