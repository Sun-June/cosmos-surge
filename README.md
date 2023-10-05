# Cosmos Surge

![favicon.ico](favicon.ico)

#### [中文](./README.cn.md)

#### [日本語](./README.jp.md)

Cosmos Surge is a client tool for Azure Cosmos DB data layer.

Its main purpose is to help developers or data maintenance personnel manage and operate data more conveniently.

![main.png](readme%2Fimage%2Fmain.png)

## How to Use

### Option 1: Download the Client:

- Download the client from the provided link.
  - [Releases](https://github.com/Sun-June/cosmos-surge/releases)
- Install the client on your system.
- Launch the application and start using it.

### Option 2: Run Using Docker:

- Make sure Docker is installed on your system.
- Pull the Cosmos Surge Tool image from Docker Hub.
  - `docker pull sunjune/cosmos-surge:latest`
- Run the tool within a Docker container.
  - `docker run --name cosmos-surge -d -p 1212:9999 sunjune/cosmos-surge`
- Finally, open your web browser.
  - [http://localhost:1212](http://localhost:1212/)

## Operating Instructions

- First, click on `Add` or ` Create Link ` to add a database link.
  - ![step1.png](readme%2Fimage%2Fstep1.png)
  - `name` is the custom name for this link.
  - `connectionString` is the connection string for your cosmosdb, and the example here is for the local emulator.
  - You can click `test` to verify if the link is valid.
  - If everything is correct, click `Save` to add it.
- After adding successfully, a menu item will appear on the left, and hovering over it will reveal the following three-level menu:
  - ![step2.png](readme%2Fimage%2Fstep2.png)
  - ` TestData2 ` , ` TestData ` , ` BF ` correspond to the ` database id ` in cosmos.
    - `Data1`, `Data2`, `Data3` under `TestData` are the `container id` in cosmos.
  - `REFRESH` is for refreshing the current menu item.
  - `EDIT` is for re-editing the link.
  - `DELETE` is for removing the current link.
- Clicking on the third-level menu ` Data1 ` will show the following operation interface:
  - ![step3.png](readme%2Fimage%2Fstep3.png)
  - The tabs in the main interface are the operation panels for the current `container` (multiple can be opened at the same time).
  - The list displays the `partition` classifications in the current database. You can quickly query by selecting (multi-selectable), and the query results are paginated.
- After clicking the query, the result will be displayed as follows:
  - ![step4.png](readme%2Fimage%2Fstep4.png)
  - In the interface, the upper part is the selected `partition` and related operation buttons.
  - The middle part is the corresponding query SQL and pagination information.
    - The SQL can be edited, and after editing, you can click `query` to execute the query.
  - The lower part displays the main query content for viewing, modification, and deletion.
- After modifying the data, you can click ` Update items ` to update:
  - ![step5.png](readme%2Fimage%2Fstep5.png)
  - The update operation, as shown in the figure, will display the comparison of the data to be changed this time.
  - After confirming, click `update` to perform the update operation.
- You can also perform deletion operations. After deleting the data, click ` Delete items ` to delete:
  - ![step6.png](readme%2Fimage%2Fstep6.png)
  - The displayed data will be deleted. After confirming, click `delete` to confirm the deletion.
- ` Functions ` button group:
  - `add` allows you to add new data.
  - ` history ` allows you to view the operation records.
    - ![step7.png](readme%2Fimage%2Fstep7.png)
    - The tabs are types of operations.
    - The current page is the update log just performed, and clicking `update details...` will show the data at that time.
  - ` export ` button allows you to import the current query result data into another ` container `
    - ![step8.png](readme%2Fimage%2Fstep8.png)
    - `toId` is the target `container` you selected.
    - ` Handling duplicate data ` is the way to handle identical data (i.e., data with the same id and partition).
      - `upsert` is for forceful update.
      - `skip` is for skipping without processing.
    - After confirming, click `Do` to start.
    - The execution interface is as follows:
      - ![step9.png](readme%2Fimage%2Fstep9.png)
      - The execution interface can be closed.
      - It contains various progress information and corresponding SQL statement information.
      - There are pause and cancel buttons in the upper right corner.

## Local Development or Packaging

### Local Development

- Start by cloning the project for the view layer as well from this address:[cosmos-surge-view](https://github.com/Sun-June/cosmos-surge-view) .
  - First, run the command `npm install`.
  - Then, execute `npm run dev`.
- Clone the current project as well.
  - First, run the command `npm install`.
  - Then, execute `npm run start`.
- At this point, you will see Electron starting, and you can proceed with debugging and development.

### Local Packaging

- Begin by cloning the project for the view layer as well from this address:[cosmos-surge-view](https://github.com/Sun-June/cosmos-surge-view) .
  - First, run the command `npm install`.
  - Then, execute `npm run build`.
  - Prepare the files from the `dist` directory for use in the next steps.
- Also, clone the current project.
  - First, run the command `npm install`.
  - Then, copy the contents of the ` dist ` directory prepared earlier into the ` static ` directory of the current project.
    - If the `static` directory does not exist, you will need to create it yourself.
  - Finally, execute the appropriate command based on your platform:
    - For Mac: `npm run package:mac`.
    - For Windows: `npm run package:win`.