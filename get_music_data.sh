# download music data from private git repo

# check if git folder is cloned and can be updated or needs to be cloned
if [ ! -d "data_about_thomasrosen" ] ; then
    git clone https://github.com/thomasrosen/data_about_thomasrosen.git
else
    cd data_about_thomasrosen
    git pull
    cd ..
fi

# for production
mkdir -p ./build/static/music/playlists
cp ./data_about_thomasrosen/music/playlists/* ./build/static/music/playlists

# for development
mkdir -p ./public/music/playlists
cp ./data_about_thomasrosen/music/playlists/* ./public/music/playlists

node ./build_music_metadata.js

# maybe clean up the folder (but it's in gitignore, so can stay here to be faster in dev)
# rm -rf ./data_about_thomasrosen
