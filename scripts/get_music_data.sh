# download music data from private git repo

echo "✅ started get_music_data.sh";

# check if git folder is cloned and can be updated or needs to be cloned
if [ ! -d "data_about_thomasrosen" ] ; then
    git clone https://github.com/thomasrosen/data_about_thomasrosen.git
else
    cd data_about_thomasrosen
    git pull
    cd ..
fi

echo "✅ done cloneing";

# for development
mkdir -p ./src/data/music/playlists
cp ./data_about_thomasrosen/music/playlists/* ./src/data/music/playlists

echo "✅ done coping playlists to public";

node ./build_music_metadata.js

echo "✅ done running build_music_metadata.js";

# maybe clean up the folder (but it's in gitignore, so can stay here to be faster in dev)
# rm -rf ./data_about_thomasrosen

echo "✅ finished get_music_data.sh";
