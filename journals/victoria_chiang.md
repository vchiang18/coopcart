2.9.24

- created several front end components: add property, edit user, and the aggregate signup flow (for member and KM)
- deployed backend and front end
- learns: 1. in depth experience of the potential benefits of RTK (since not using global state), 2. how to pass collect several different piece of information and pass them to different endpoints in one view (react has special logic for forms - you cannot have multiple form components on one page), 3. limitations of jwt-down package, since the inability to edit the user signup flow with custom fields is what led to several days of trying different ways to add / create properties from the signup flow, 4. particular ways the front end auth package likes to work (credentials: include more reliable than the token)

  2.2.24

- began front end work on signup flow and editing user information, ran into some blocks around conflicting CSS from other team members
- set up front end auth: explored redux/RTK but ultimately went with standard implementation due to time constraints. (Shifting RTK to stretch goal)
- learn: How to connect complexity of project scope to a sense of work-hours. Could have down-scoped our backend and used more time on front end work.

  1.26.24

- finished individual endpoints
- added backend auth to user endpoints (WIP - still need to test logic to restrict get_all_users by to logged in KM by property)
- learn: formatting of inputs and outputs in endpoints, how to troubleshoot, use row_factory

  1.19.24

- created all data tables
- created first endpoint (user POST)
- assigned remaining models & endpoints out as issues to team
- learn: need to _either_ drop tables or delete volumes (interchangeable) when editing data tables --> there are cases when dropping tables alone didn't work. Deleting volumes is safest.

  1.12.24

- completed MVP, wireframes, and API endpoint documentation
- cloned repo down, created docker containers
