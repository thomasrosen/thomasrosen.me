# download music data from private git repo

echo "✅ started build_more_data.sh";

# Load environment variables from .env file
if [ -f .env ]; then
    echo "📥 Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
else
    echo "⚠️ No .env file found, using environment variables directly"
fi

# Check if GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
    echo "❌ Error: GH_TOKEN environment variable is not set"
    echo "💡 Please set it in your .env file or environment"
    exit 1
fi

echo "GH_TOKEN: $GH_TOKEN"
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
cp ./data_about_thomasrosen/music/playlists/* ./src/data/music/playlists
echo "✅ done copying playlists";

node ./scripts/build_music_metadata.js
echo "✅ done running build_music_metadata.js";

# copy entries.yml to src/data/entries.yml
cp ./data_about_thomasrosen/entries.yml ./src/data/entries.yml
echo "✅ done copying entries.yml";

node ./scripts/build_entries.js
echo "✅ done running build_entries.js";

# maybe clean up the folder (but it's in gitignore, so can stay here to be faster in dev)
# rm -rf ./data_about_thomasrosen

echo "✅ finished build_more_data.sh";
