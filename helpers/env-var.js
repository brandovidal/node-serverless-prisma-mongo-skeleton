//helperScript.js
const SSM = require("aws-sdk/clients/ssm");

module.exports = async ({ resolveConfigurationProperty }) => {
  const stage = await resolveConfigurationProperty(["provider", "stage"]);
  const region = await resolveConfigurationProperty(["provider", "region"]);

  const ssm = new SSM({ region });
  const policy = await ssm
    .getParameter({
      Name: `/system/backoffice/api/${stage}/`,
      WithDecryption: true,
    })
    .promise();
  console.log("🚀 ~ file: env-var.js:14 ~ module.exports.getParameters= ~ policy", policy)

  const res = JSON.parse(policy.Parameter.Value);
  console.log("🚀 ~ file: env-var.js:16 ~ module.exports.getParameters= ~ res", res)

  return res
};