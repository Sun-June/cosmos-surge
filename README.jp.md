# Cosmos Surge 

![favicon.ico](favicon.ico)

Cosmos SurgeはAzure Cosmos DBのデータレイヤーのクライアントツールです。

主な目的は、開発者またはデータ管理担当者がデータをより便利に管理および操作できるようにすることです。

![main.png](readme%2Fimage%2Fmain.png)

## 使い方

### オプション1：クライアントのダウンロード：

* 提供されたリンクからクライアントをダウンロードします。
    * [Releases](https://github.com/Sun-June/cosmos-surge/releases)
* クライアントをシステムにインストールします。
* アプリケーションを起動し、使用を開始します。

### オプション2：Dockerを使用して実行：

* システムにDockerがインストールされていることを確認します。
* Docker HubからCosmos Surge Toolのイメージを取得します。
    * `docker pull sunjune/cosmos-surge:latest`
* Dockerコンテナ内でツールを実行します。
    * `docker run --name cosmos-surge -d -p 1212:9999 sunjune/cosmos-surge`
* 最後に、Webブラウザを開いてください。
    * http://localhost:1212

## 操作手順

* まず、データベースリンクを追加するために Add または Create Link をクリックします。
  * ![step1.png](readme%2Fimage%2Fstep1.png)
  * `name`はこのリンクのカスタム名です。
  * `connectionString`はCosmos DBの接続文字列で、ここにはローカルエミュレーターの例があります。
  * リンクが有効かどうかを確認するには、`test` をクリックできます。
  * すべて正しい場合は、`Save` をクリックして追加します。
* 成功裡に追加した後、左側にメニューアイテムが表示され、ホバーすると以下の3階層メニューが表示されます。
  * ![step2.png](readme%2Fimage%2Fstep2.png)
  * `TestData2`、`TestData`、`BF`はCosmos内の `database id` に対応しています。
    * `TestData` の下の `Data1`、`Data2`、`Data3` はCosmos内の `container id` に対応しています。
  * `REFRESH`は現在のメニューアイテムをリフレッシュするためです。
  * `EDIT`はリンクを再編集するためです。
  * `DELETE`は現在のリンクを削除するためです。
* 三階層メニューの `Data1` をクリックすると、以下の操作インターフェースが表示されます。
  * ![step3.png](readme%2Fimage%2Fstep3.png)
  * メインインターフェースのタブは現在の `container` の操作パネルです（複数同時に開けます）。
  * リストには現在のデータベース内の `partition` の分類が表示され、選択してクエリでき、クエリ結果はページ分割されます。
* クエリをクリックした後、結果は以下のように表示されます：
  * ![step4.png](readme%2Fimage%2Fstep4.png)
  * インターフェースでは、上部が選択された `partition` と関連する操作ボタンです。
  * 中央部分は対応するクエリSQLとページネーション情報です。
    * SQLは編集でき、編集後は `query` をクリックしてクエリを実行できます。
  * 下部は主要なクエリコンテンツを表示して、表示、変更、削除ができます。
* データを変更した後は、`Update items` をクリックして更新できます：
  * ![step5.png](readme%2Fimage%2Fstep5.png)
  * 図に示すように、更新操作は今回変更されるデータの比較を表示します。
  * 確認後、`update` をクリックして更新操作を実行します。
* 削除操作も行えます。データを削除した後、`Delete items` をクリックして削除できます：
  * ![step6.png](readme%2Fimage%2Fstep6.png)
  * 表示されるのは削除するデータです。確認後、`delete` をクリックして削除を確認します。
* `Functions`ボタングループ：
  * `add`をクリックすると新しいデータを追加できます。
  * `history`をクリックすると操作履歴を表示できます。
    * ![step7.png](readme%2Fimage%2Fstep7.png)
    * タブは操作の種類です。
    * 現在のページは直前に実行した更新ログで、`update details...` をクリックするとその時のデータが表示されます。
  * `export` ボタンは、現在のクエリ結果データを別の `container` にインポートできます。
    * ![step8.png](readme%2Fimage%2Fstep8.png)
    * `toId` は選択したターゲット `container` です。
    * `Handling duplicate data` は同じデータを処理する方法です（つまり、同じidとpartitionを持つデータ）。
      * `upsert`は強制的な更新です。
      * `skip`は処理せずにスキップします。
    * 確認後、`Do` をクリックして実行を開始します。
    * 実行インターフェースは次のとおりです：
      * ![step9.png](readme%2Fimage%2Fstep9.png)
      * 実行インターフェースは閉じることができます。
      * さまざまな進捗情報と対応するSQLステートメント情報が含まれています。
      * 右上隅には一時停止とキャンセルボタンがあります。

## ローカル開発またはパッケージング

### ローカル開発

* まず、ビューレイヤーのプロジェクトをクローンします。アドレス： [cosmos-surge-view](https://github.com/Sun-June/cosmos-surge-view) .
  * 最初に `npm install` コマンドを実行します。
  * 次に、`npm run dev` を実行します。
* 現在のプロジェクトもクローンします。
  * まず、コマンド `npm install` を実行してください。
  * その後、`npm run start` を実行してください。
* これでElectronが起動し、デバッグ開発ができます。

### ローカルパッケージング

* また、ビューレイヤーのプロジェクトもクローンする必要があります。アドレス： [cosmos-surge-view](https://github.com/Sun-June/cosmos-surge-view) .
    * まず、コマンド `npm install` を実行してください。
    * その後、`npm run build` を実行してください。
    * dist ディレクトリ内のファイルを準備し、次に進みます。
* 現在のプロジェクトもクローンしてください。
    * まず、コマンド `npm install` を実行してください。
    * 次に、ビューレイヤープロジェクトから上記で準備した dist ディレクトリの内容を static ディレクトリにコピーしてください。
      * staticディレクトリが存在しない場合、作成してください。
    * 最後に、ご自身のプラットフォームに合わせて次のコマンドを実行してください。
      * mac: `npm run package:mac`.
      * windows: `npm run package:win`.

