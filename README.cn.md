# Cosmos Surge 

![favicon.ico](favicon.ico)

Cosmos Surge是一个Azure Cosmos DB的数据层级的客户端工具。

主要目的是为了帮助开发人员或者数据维护人员更方便的管理和操作数据而存在。

![main.png](readme%2Fimage%2Fmain.png)

## 如何使用

### 方式1： 下载客户端:

* 从提供的链接下载客户端。
    * [Releases](https://github.com/Sun-June/cosmos-surge/releases)
* 安装客户端到您的系统。
* 启动应用程序并开始使用。

### 方式2： 或者采用 Docker 模式进行运行:

* 确保您的系统已安装 Docker。
* 从 Docker Hub 拉取 Cosmos Surge Tool 镜像。
    * `docker pull sunjune/cosmos-surge:latest`
* 在 Docker 容器中运行工具。
    * `docker run --name cosmos-surge -d -p 1212:9999 sunjune/cosmos-surge`
* 最后一步，打开您的网络浏览器
    * http://localhost:1212

## 操作说明

* 首先点击`Add`或者`Create Link`添加一个数据库链接
  * ![step1.png](readme%2Fimage%2Fstep1.png)
  * 其中`name`是这个链接的自定义名称
  * `connectionString`为cosmosdb的链接字符串，此处的示例为本地仿真器的链接。
  * 可点击`test`验证链接是否有效
  * 确认无误则点击`Save`进行添加
* 添加成功后左侧会出现菜单项，鼠标移动上去会出现以下三级菜单
  * ![step2.png](readme%2Fimage%2Fstep2.png)
  * 其中`TestData2`,`TestData`,`BF`对应的为cosmos中的`database id`
    * `TestData`下的`Data1`,`Data2`,`Data3`则为cosmos中的`container id`
  * `REFRESH`为刷新当前菜单项目
  * `EDIT`为重新编辑链接
  * `DELETE`为移除当前链接
* 点击第三级菜单`Data1`后出现如下操作界面
  * ![step3.png](readme%2Fimage%2Fstep3.png)
  * 主界面的页签为当前`container`的操作面板（可以同时打开复数个）
  * 列表中显示为当前数据库中的`partition`分类，选择后可快速的查询（可多选），查询结果带分页
* 点击查询后显示结果如下
  * ![step4.png](readme%2Fimage%2Fstep4.png)
  * 界面中，上部分为选择的`partition`和相关操作按钮
  * 中间为对应的查询sql和分页信息
    * sql可进行编辑，编辑完成后可点击`query`进行查询
  * 下面部分为主要查询内容的展示，可进行查阅，变更及删除
* 当进行变更数据后，可点击`Update items`按钮进行更新
  * ![step5.png](readme%2Fimage%2Fstep5.png)
  * 更新操作如图，会显示出此次变更数据的对比
  * 确认无误后点击`update`进行更新操作
* 也可进行删除操作，删除数据后，点击`Delete items`按钮进行删除
  * ![step6.png](readme%2Fimage%2Fstep6.png)
  * 显示的为将要删除的数据，确认无误后，点击`delete`确定删除
* `Functions`按钮组
  * `add`可以进行新增一条数据
  * `history`可以查看操作记录
    * ![step7.png](readme%2Fimage%2Fstep7.png)
    * 页签为各种操作的类型
    * 当前页为刚刚上面操作的更新日志，点击`update details...`还可以看到当时的数据
  * `export`按钮功能为将当前的查询结果数据导入到其他的`container`中去
    * ![step8.png](readme%2Fimage%2Fstep8.png)
    * `toId`为选择的目标`container`
    * `Handling duplicate data`为处理相同数据的方式（即id和partition相同的数据）
      * `upsert`为强制更新
      * `skip`为跳过不处理
    * 确定无误后，点击`Do`开始执行
    * 执行界面如下：
      * ![step9.png](readme%2Fimage%2Fstep9.png)
      * 执行界面可关闭
      * 其中包含各种进度信息及对应的sql语句信息
      * 右上角有暂停和取消功能按钮

## 本地开发或打包

### 本地开发

* 需要先将视图层的项目也clone下来，地址： [cosmos-surge-view](https://github.com/Sun-June/cosmos-surge-view) .
  * 先执行命令 `npm install`.
  * 再执行 `npm run dev`.
* 将当前项目也clone下来
  * 先执行命令 `npm install`.
  * 再执行 `npm run start`.
* 此时可看到electron启动，可进行调试开发

### 本地打包

* 需要先将视图层的项目也clone下来，地址： [cosmos-surge-view](https://github.com/Sun-June/cosmos-surge-view) .
    * 先执行命令 `npm install`.
    * 再执行 `npm run build`.
    * 将dist目录中的文件准备好，接下来准备使用
* 将当前项目也clone下来
    * 先执行命令 `npm install`.
    * 然后将上面准备好的dist目录中的内容，拷贝到当前项目的static目录下
      * 如果static目录不存在，则需要自己新建下
    * 最后执行根据你自己的平台执行
      * mac: `npm run package:mac`.
      * windows: `npm run package:win`.

