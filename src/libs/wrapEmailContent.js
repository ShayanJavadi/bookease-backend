import getVariable from "../config/getVariable";

export default content => `
${content}
<p>- ${getVariable("APP_NAME")}'s Team</p>
<p style="font-size: 75%">Please do not reply to this message. Replies to this message are routed to an unmonitored mailbox. If you have questions please go to ${getVariable("WWW_URL")}/contact-us.</p>
`;
