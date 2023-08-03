<template>
  <el-col :span="24" style="padding: 1em 0">
    <div class="pb-4">
      <div class="pagination-number" style="float: left; font-size: 12px">
        {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
        {{ this.lastNumber }} {{ $t("of") }}
        {{ this.totalRows }}
      </div>
      <div class="page-limit">
        <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
          <b-form-select
            v-model="filter.PageLimit"
            id="PageLimitSelect"
            size="sm"
            :options="filter.pageOptions"
          ></b-form-select>
        </div>
        <div class="per-page" style="float: left; font-size: 12px">
          {{ $t("RecordsPerPage") }}
        </div>
      </div>
      <div style="float: right">
        <b-pagination
          v-model="filter.PageNumber"
          :total-rows="totalRows"
          :per-page="filter.PageLimit"
          align="right"
          size="sm"
          class="my-0 mobile-pagination"
        ></b-pagination>
      </div>
    </div>
  </el-col>
</template>
<script>
import StudentFinalMarkService from "@/services/StudentFinalMark.service";

export default {
  data() {
    return {
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        statusid: 0,
        PageLimit: 20,
        schoolyearid: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        searchtype: 2,
			},
			totalRows: "",
    };
	},
	created() {
		this.Refresh();
	},
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
    },
  },
	methods: {

		Refresh() {
      this.isBusy = true;
      StudentFinalMarkService.GetList(
        this.filter.schoolyearid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
      });
		},
		ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
      }
      this.Refresh();
    },
  },
	watch: {
		"filter.PageNumber": {
			handler(newValue, oldValue) {
				if (newValue) {
					this.Refresh();
				}
			},
		},
		"filter.PageLimit": {
			handler(newValue, oldValue) {
				if (newValue) {
					this.Refresh();
				}
			},
		},
	},
};
</script>
