/*
Problem
------------------------------------------
Build a function that parses a string of email data.

Inputs: 1 string, the email text
- Contains multiple emails, separated by '##||##'
- Each email has 5 parts, separated by '#/#'
  - Sender, Subject, Date, Recipient, Body (in that order)
Outputs: 
- Number of email messages in the string
- Date range of messages
 

Rules/Requirements
- 

Clarifying Questions
- 

Examples, Test Cases
------------------------------------------


Data Structure, Algorithm
------------------------------------------
Algorithm
- Parse string into array of email string
  - Array length is the count of emails.
- Parse each email into an object with 5 entries (the 5 parts)
  - Key: 'Sender', etc. Value: Text of the part
- Extract the dates from each of the emails.
  - Use Date object to find min and max of the dates
*/

'use strict';

function mailCount(emailData) {
  let emails = emailData.split('##||##');

  emails = emails.map((email) => {
    let parts = email.split('#/#').map((text) => text.trim());
    let [sender, subject, date, recipient, body] = parts;

    return {
      sender: sender.replace(/^From: /, ''),
      subject: subject.replace(/^Subject: /, ''),
      date: new Date(date.replace(/^Date: /, '')),
      recipient: recipient.replace(/^To: /, ''),
      body,
    };
  });

  let sortedEmails = emails.sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });
  let oldestDate = sortedEmails[0].date.toDateString();
  let newestDate = sortedEmails[sortedEmails.length - 1].date.toDateString();

  console.log(`Count of Email: ${emails.length}`);
  console.log(`${oldestDate} - ${newestDate}`);
}

mailCount(emailData);
