# Cosmos Surge 

![favicon.ico](favicon.ico)

Cosmos Surge is a straightforward tool for managing Azure Cosmos DB instances.

![main.png](readme%2Fimage%2Fmain.png)

## Usage Instructions

### 1. Downloading the Client / クライアントのダウンロード / 下载客户端:

* Download the client from the provided link.
提供されたリンクからクライアントをダウンロードします。
从提供的链接下载客户端。
  * [Releases](https://github.com/Sun-June/cosmos-surge/releases)
* Install the client on your system.
システムにクライアントをインストールします。
安装客户端到您的系统。
* Launch the application and start using it.
アプリケーションを起動し、使用を開始します。
启动应用程序并开始使用。

### 2. Using Docker / Docker の使用 / 采用 Docker 模式进行运行:

* Ensure you have Docker installed on your system.
システムに Docker がインストールされていることを確認します。
确保您的系统已安装 Docker。
* Pull the Cosmos Surge Tool image from Docker Hub.
Docker Hub から Cosmos Surge Tool イメージを取得します。
从 Docker Hub 拉取 Cosmos Surge Tool 镜像。
  * `docker pull sunjune/cosmos-surge:latest`
* Run the tool within a Docker container.
Docker コンテナ内でツールを実行します。
在 Docker 容器中运行工具。
  * `docker run --name cosmos-surge -d -p 1212:9999 sunjune/cosmos-surge`
* Final Step: Open Your Browser and Visit / 最後のステップでは、ウェブブラウザを開き / 最后一步，打开您的网络浏览器
  * http://localhost:1212

## Local Development Steps:

* To run the frontend, please refer to the [cosmos-surge-view](https://github.com/Sun-June/cosmos-surge-view) project for instructions.
* Clone the project and execute `npm install`.
* Start local development with `npm run start`.

These are the steps to set up and begin local development.

## features:

* Multi-Instance Management: Seamlessly manage data from multiple Cosmos DB instances through a single interface.

* Convenient Querying: Easily query data with powerful filtering capabilities, making complex operations simple.

* Grouping by Partition: Group data by defined partitions for more efficient operations.

* Edit and Delete Records: Modify and delete data based on query results while retaining a log of changes for reference.

* Effortless Data Insertion: Quickly insert new data records with ease.

* Batch Data Import: Efficiently import query results into other containers.

* Cosmos Surge simplifies the process of working with Azure Cosmos DB, providing a user-friendly interface for managing and querying your data.

------------

## 日本語説明

Cosmos Surge は、Azure Cosmos DB データベースの操作を簡単かつ効率的に行うためのシンプルでパワフルなツールです。開発者、データベース管理者、データ分析者のいずれであっても、Cosmos Surge は Azure Cosmos DB データの管理と分析に対するニーズを満たします。

## 主要な機能

* Cosmos Surge は、Azure Cosmos DB データの管理と操作を簡単に行えるようにする多くの機能を提供します。

* マルチインスタンス管理: Cosmos Surge を使用すると、複数の Azure Cosmos DB インスタンスのデータを同時に管理できます。これにより、複数の Cosmos DB インスタンス間をスムーズに切り替えることができます。複数のアカウントでログインしたり、異なるツールを使用したりする必要はありません。

* 簡単なクエリ: Cosmos Surge は強力なクエリ機能を提供し、豊富なクエリ条件を使用して必要なデータを取得できます。ドキュメントのプロパティ、値、分区などに基づいて柔軟なクエリを実行し、必要な情報を正確に見つけることができます。

* 分组と分区: 操作を簡素化するために、Cosmos Surge ではパーティションの設定に基づいてデータをグループ化できます。これにより、データの管理とフィルタリングがより簡単になります。

* データの編集と削除: クエリ結果可視化後、データを編集または削除できます。Cosmos Surge はこれらの変更を記録し、いつでも操作履歴を確認できます。

* データの挿入: 新しいデータを Cosmos DB に挿入することはこれまでにないほど簡単です。Cosmos Surge は直感的なインターフェースを提供し、指定したコンテナにデータを挿入するのが簡単になります。

* バルクデータのインポート: 現在のクエリ結果を他のコンテナにバルクデータとしてインポートする必要がある場合、Cosmos Surge もこの機能を提供しています。データの移行や整理に役立ちます。

## 使い方ガイド

------------

## 中文说明


Cosmos Surge 是一个简单但强大的工具，旨在使 Azure Cosmos DB 数据库的操作变得轻松且高效。无论您是开发人员、数据库管理员还是数据分析师，Cosmos Surge 都可以满足您对 Cosmos DB 数据的管理和其他基本操作。

## 主要功能

* Cosmos Surge 提供了多项功能，让您更轻松地管理和操作 Azure Cosmos DB 数据。

* 多实例管理：通过 Cosmos Surge，您可以同时管理多个 Azure Cosmos DB 实例的数据。这意味着您可以轻松地在不同的 Cosmos DB 实例之间切换，无需登录多个账户或使用不同的工具。

* 便捷的查询：Cosmos Surge 提供强大的查询功能，让您可以使用丰富的查询条件来检索所需的数据。您可以根据文档的属性、值、分区等进行灵活的查询，从而精确地找到需要的信息。

* 分组和分区：为了简化操作，Cosmos Surge 允许您根据设置的分区对数据进行分组。这使得数据的管理和筛选变得更加简单，特别是对于大规模的数据集。

* 编辑和删除数据：查询结果可视化后，您可以轻松地编辑或删除数据。Cosmos Surge 会记录这些更改，以便您随时查看历史操作记录。

* 插入数据：将新数据插入 Cosmos DB 从未如此简单。Cosmos Surge 提供直观的界面，让您可以轻松地将数据插入到指定的容器。

* 批量导入数据：如果您需要将当前查询结果批量导入到其他容器，Cosmos Surge 也提供了这个功能。这对于数据的迁移和整理非常有用。

