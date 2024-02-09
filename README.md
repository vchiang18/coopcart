# CoopCart

## Group members

Josh Yu
Malek Byam
Sherryane Shen
Victoria Chiang

## CoopCart: Organizing your coop’s food needs to nourish your community.

Living in a coop or intentional community means living in a diverse environment with different tastes. As a Kitchen Manager, streamline how to receive food requests, track your purchases, and optimize your ordering process to keep your community thriving.

## Design and Documentation

- Wireframes & API endpoints: https://excalidraw.com/#room=2f932edb7ab0b8054e7b,zNegcOut59JTmuhten0YEQ
- SQL schema: https://dbdiagram.io/d/CoopCart-Schema-65a193e6ac844320aed0c062
- User stories / issues (Gitlab): https://gitlab.com/big-bytes/module3-project-gamma/-/issues
- API endpoints: https://www.notion.so/API-endpoints-documentation-ba503261444e48dcac5f3b48a9bd926c?pvs=4

## Intended Market

CoopCart targets individuals who live in coop communities of 5-100 people. While coops can differ in interests and values, they share a common feature of mutually shouldering the responsibilities of the household. Many coops have a Kitchen Manager who is in charge of managing food requests from other members and ordering/restocking communal kitchen items. They are also responsible for tracking the entire house’s food budget over a weekly, monthly, or annual basis.

Currently, this process is often handled manually and over several different communication streams (in spreadsheets, by verbal or text message requests). This is both cumbersome and prone to error. CoopCart aims to streamline the entire request-to-order process and offer insights into household budget and purchase habits over time.

For examples of coops, learn more here: https://haight-st-commons.org/, https://www.bsc.coop/

## Functionality

To begin using CoopCart, a coop’s Kitchen Manager (KM) will first create an account and add a property (the details of their house).
After doing so, other house members can create their individual accounts and join the coop they are a part of.
Each member can create requests. Requests are for individual food items and track a name, brand, and quantity, such as “Figs, 1 basket, generic” or “Peanut Butter, 16oz jar, 2 jars, Justin’s brand”, with an “New” status.
KMs have the ability to view all requests for their household and either fulfill the requests (which converts the request to an order) OR change the status to denied and leave relevant notes.
Note: Actual shopping for orders happen outside of the app (such as on Instacart, or an in-person shopping trip)
Users can see a list of the requests they have made and search through them.
Users can see a list of orders for their household and search through them.
P2 functionality will include automatically creating brands and vendors for more detail tracking and insights in the future.

## Project Initialization

To run this application on your local machine, please make sure to follow these steps:

- Clone the repository down to your local machine
- CD into the new project directory
- Run: docker volume create coopcart-db
- Run: docker compose build
- Run: docker compose up

From there, you can enjoy the app's full functionality!
