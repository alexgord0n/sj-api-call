const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { userId, courseId } = JSON.parse(event.body);

  const response = await fetch(`https://api.skilljar.com/v1/user_progress/alexgordon.skilljar.com/${userId}/courses/${courseId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.SKILLJAR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: true }),
  });

  const text = await response.text();

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Course marked complete!", raw: text })
    };
  } else {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: text })
    };
  }
};