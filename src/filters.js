import Vue from "vue";

Vue.filter('artist', value => {
    if (!value)
        return '';
    else if (value.artist) {
        if (Array.isArray(value) && value.length > 2) {
            let artists = value[0].name;

            for (let i = 1; i < value.length; i++)
                artists += ' ft. ' + value[i].name;

            return artists;
        }
        else
            return value.name;
    } else
        return value.author;
});

Vue.filter('thumbnail', value => {
    if (!value)
        return 'default';
    else if (Array.isArray(value.thumbnails))
        return value.thumbnails[0].url;
    else if (value.thumbnails)
        return value.thumbnails.url;
    else
        return 'default';
});
