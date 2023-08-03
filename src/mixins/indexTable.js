export default {
    computed: {
        firstNumber() {
            return this.totalRows > 0
              ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
              : 0;
        },
        lastNumber() {
            if (this.totalRows < this.filter.PageLimit) {
                return this.totalRows;
            } else {
                if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
                return this.totalRows;
                } else {
                return this.filter.PageNumber * this.filter.PageLimit;
                }
            }
        }
    },
    methods: {
        getItemColor(id) {
            return id === 1
              ? "primary"
              : id === 2
              ? "success"
              : id === 3
              ? "danger"
              : id === 4
              ? "primary"
              : "primary";
        },
        forceFileDownload(response, name) {
            var headers = response.headers;
            var blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", name + ".xlsx"); //or any other extension
            document.body.appendChild(link);
            link.click();
        },
        makeToast(message, title, type) {
            this.$bvToast.toast(message, {
              title: title,
              autoHideDelay: 2000,
              variant: type,
              solid: true,
            });
        },
        getText(key) {  
            return this.$t(key);
        },
    }
}