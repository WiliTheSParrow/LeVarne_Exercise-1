new Vue({
    el: '#app',
    data: {
        message: 'Hello World!',
        allRelationships: [],
        filteredRelationships: []
    },

    created: function () {
        this.getLocalData('./data.json', 'allRelationships');

    },

    methods: {
        // Fetching data from local json file and error handling.
        getLocalData: function (link, destination) {
            fetch(link, {
                    method: "GET",
                })
                .then(response => response.json())
                .then(json => {
                    app[destination] = json;
                    if (app.filteredRelationships == '') {
                        this.getAllRelationships();
                    };
                })
                .catch(error => error);
        },

        // Fills the filteredRelationships array with all relations.
        getAllRelationships: function () {
            this.filteredRelationships = this.allRelationships;
        },

    }
})