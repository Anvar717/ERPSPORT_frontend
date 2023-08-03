<template>
    <b-row>
      <b-col
        sm="12"
        md="4"
        lg="4"
        v-for="(item, index) in labels"
        :key="index"
        v-show="labels.length != 0"
      >
        <div
          class="d-flex my-1"
          v-for="(i, index) in items.filter(
            (el) => el.tablefileconfigid == item.id
          )"
          :key="index"
        >
          <b-button-group size="sm" v-if="i.Status != 3">
            <b-button @click="DownloadFile(i)" variant="outline-primary"
              ><b-icon
                v-if="DownloadLoading != i.attachmentfileid"
                icon="download"
              ></b-icon>
              <b-spinner
                small
                v-if="DownloadLoading == i.attachmentfileid"
              ></b-spinner>
            </b-button>
            <b-button variant="primary">{{ i.attachmentfilename }}</b-button>
            <!-- <b-button @click="DeleteFile(i, index)" variant="outline-danger"
              ><b-icon v-if="DeleteLoading != i.attachmentfileid" icon="trash">
                <b-spinner
                  small
                  v-if="DeleteLoading == i.attachmentfileid"
                ></b-spinner> </b-icon
            ></b-button> -->
          </b-button-group>
        </div>
      </b-col>
    </b-row>
  </template>
  <script>
  import FileManageService from "@/services/filemanage.service";
  export default {
    props: {
      labels: {
        type: Array,
        default: [],
      },
      items: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        DownloadLoading: false,
        DeleteLoading: false,
        fileLoading: false,
      };
    },
    methods: {
      ChangeFile1(event, item) {
        if (event.target.files[0]) {
          this.$emit("change", event, item);
        }
      },
      changefileindex(item, index) {
        this.$refs.fileManage[index].$el.click();
      },
      fileTypes(type) {
        let extensions = ''
        if (type.Tables1 && type.Tables1.length) {
          type.Tables1.forEach(el => {
            extensions = extensions + el.extension + ', '
          })
        } else {
          extensions = '.jpg, .png, .pdf, .xlsx'
        }
        return extensions
      },
      DeleteFile(item, index) {
        if (item.Status == 1) {
          this.items.splice(index, 1);
        } else {
          this.items.forEach(function (el) {
            if (el.attachmentfileid == item.attachmentfileid) {
              item.Status = 3;
            }
          });
        }
        this.$emit("delete", this.items);
      },
      DownloadFile(item) {
        this.DownloadLoading = item.attachmentfileid;
        FileManageService.Get(item.attachmentfileid, 1)
          .then((res) => {
            this.DownloadLoading = "";
            this.forceFileDownload(
              res,
              item.attachmentfilename + "." + item.attachmentfileid.split(".")[1]
            );
          })
          .catch((error) => {
            this.DownloadLoading = "";
            this.makeToast(error.response.data.error, this.$t("error"), "danger");
          });
      },
      forceFileDownload(response, name) {
        var headers = response.headers;
        var blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
  
        link.setAttribute("download", name); //or any other extension
        document.body.appendChild(link);
        link.click();
      },
    },
  };
  </script>