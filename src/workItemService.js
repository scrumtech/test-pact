import request from 'request-promise';
// TODO use request promist instead of super agent
/**
 * Retrives all the available claims for a particular `user_id` within the database.
 * @param {string} url the work item service url
 * @param {string} data the payload to send to the work item service
 * @returns {string} workitemid the id of the work item created;
 */
export const createWorkItem = (url, data) => {
  const payload = {
    applicationId: '1nib',
    body: data
  };

  const opts = {
    method: 'POST',
    uri: url,
    body: payload,
    json: true
  };

  return request(opts);
};
