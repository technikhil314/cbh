# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Notes

1. The estimates are mentioned in relative story points

### Breakdown

1. Database changes
   - acceptance criteria
     1. Code changes for any DB scripts if any
     2. DB scripts running successfully on test environment
     3. The build pipeline should be green
   - implement following changes
     1. Add column in agent table to store custom id provided by Facility. name it as `agent_id` (assuming the original primary key column is named id as a standard parctice)
        1. Contraints on column should be as follows
           1. Unique
           2. nullable
     2. For existing records where the value of `agent_id` will be non existant we can
        1. fill those values as the ids flow in future for agents
        2. till then we should continue using database `id`
     3. Update release DB scripts if any
     4. DB migration scripts if any
   - Estimation
     1. 3 story points
2. Changes in `getShiftsByFacility` function
   - acceptance criteria
     1. Code changes with PR merge
     2. The build pipeline should be green before and after merge
   - Implement following changes
     1. Unit test changes
     2. Change the function to return `agent_id` in the return value
   - Estimation
     1. 2 story point
3. Changes in `generateReport` function
   - acceptance criteria
     1. Code changes with PR merge
     2. The build pipeline should be green before and after merge
   - Implement following changes
     1. Change the function to accept `agent_id` in the list of Shifts
     2. Update the unit tests
     3. Change the funtionc to generate report
        1. with `agent_id` if the value exists for that records
        2. else with database `id` as fallback
   - Estimation
     1. 5 story points
4. Integration test changes (if any)
   - acceptance criteria
     1. Code changes along with PR merge
     2. The build pipeline should be green before and after merge
   - Implement following changes
     1. Update integration tests to check if the functionality is intact end to end
   - Estimation
     1. 3 story points
