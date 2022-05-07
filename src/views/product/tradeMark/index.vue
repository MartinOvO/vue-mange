<template>
  <div class="trademark-container">
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 表格
    data:表格组件展示的数据(array)数组类型
    border:表格边框
    -->
    <el-table border :data="list">
      <el-table-column
        label="序号"
        width="100px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="roleName" label="职务"></el-table-column>
      <el-table-column prop="nickName" label="昵称">
        <!-- 作用域插槽 -->
        <template slot-scope="{ row, $index }">
          <h2>{{ row.nickName }}</h2>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
    @current-change=""
    -->
    <el-pagination
      :total="total"
      :current-page="page"
      :page-size="3"
      :page-sizes="[3, 5, 10]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev,pager,next,jumper,->,sizes,total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 当前页数
      page: 1,
      // 每页展示条数
      limit: 3,
      // 总共的条数
      total: 0,
      // 展示的数据
      list: [],
    };
  },
  methods: {
    // 获取列表数据方法
    async getPageList() {
      // 解构出参数
      const { page, limit } = this;
      // 获取品牌列表的数据
      const result = await this.$API.trademark.reqTradeMarkList(page, limit);
      // console.log(result);
      if (result.code == 20000) {
        this.total = result.data.total;
        this.list = result.data.items;
      }
    },
    // 翻页功能
    handleCurrentChange(pager) {
      // console.log(pager);
      this.page = pager;
      this.getPageList();
    },
    // 每页展示条数发生变化时执行
    handleSizeChange(limit) {
      // console.log(limit);
      this.limit = limit;
      this.getPageList();
    },
  },
  mounted() {
    // console.log(this.$API);
    this.getPageList();
  },
};
</script>

<style scoped>
.el-button {
  margin: 10px 0;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
