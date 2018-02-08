<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>后台管理首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h1 style="line-height: 36px; color: #20A0FF">豆瓣电影排行榜</h1>
                </div>
                 <el-row>
                   <el-col :span="8" v-for="article in subjects">
                     <el-card :body-style="{ padding: '0px' }">
                      <a :href="article.alt"> <img class="bigimg" :src="article.images.large"></a>
                       <div style="padding: 14px;">
                         <span>{{ article.title }}</span>
                         <div class="bottom clearfix">
                           <time class="time">{{ article.year }}</time>
                           <el-button type="text" class="button">操作按钮</el-button>
                         </div>
                       </div>
                     </el-card>
                   </el-col>
                 </el-row>
         </el-card>

         <el-pagination
           class="pull-right clearfix"
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page.sync="pageNo"
           :page-sizes="pageSizesList"
           :page-size="pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="totalDataNumber"
           >
         </el-pagination>
    </div>
</template>

<script>
   export default {
     data() {
       return {
          subjects:[],
          pageNo: 1,
          pageSize: 10,
          pageSizesList: [10, 15, 20, 30, 50],
          totalDataNumber: 0,//数据的总数,
       }
     }
     ,created: function() {
              let self = this;
              self.init();
              },
      mounted: function() {},
      methods: {
      init() {
              let self = this;
              self.pageNo = 1;
              self.pageSize = 10;
              self.getdata();
                  },
      getdata() {
           let self = this;
           let start=self.pageNo*self.pageSize;
           let count=start+self.pageSize;
           if(self.pageNo == 1){
                count=start;
           }
           this.$axios({
                url: 'https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b&start='+start+'&count=10',
                type : 'GET',
                dataType: 'jsonp',
               })
             .then(function (response) {
               console.log(response.data);
               self.subjects = response.data.subjects;
               self.totalDataNumber=response.data.total;
             })
             .catch(function (error) {
               console.log(error);
             });
         },
         handleSizeChange(val) {
             this.pageSize = val;
             this.getdata();
                     },
         handleCurrentChange(val) {
             this.pageNo = val;
             this.getdata();
         }
      }
   }

</script>

<style scoped>
      .time {
         font-size: 13px;
         color: #999;
       }

       .bottom {
         margin-top: 13px;
         line-height: 12px;
       }

       .button {
         padding: 0;
         float: right;
       }

       .image {
         width: 100%;
         display: block;
       }

       .clearfix:before,
       .clearfix:after {
           display: table;
           content: "";
       }

       .clearfix:after {
           clear: both
       }
       .bigimg{
            width:100%;
            height:500px
       }

</style>