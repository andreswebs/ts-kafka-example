import {
  STSClient,
  GetCallerIdentityCommand,
  GetCallerIdentityCommandInput,
  GetCallerIdentityCommandOutput,
} from '@aws-sdk/client-sts';

import { SASLOptions } from 'kafkajs';

const region =
  process.env.AWS_DEFAULT_REGION || process.env.AWS_REGION || 'us-east-1';

const sts = new STSClient({ region });

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
const sessionToken = process.env.AWS_SESSION_TOKEN;

async function getAuthorizationIdentity(): Promise<string> {
  const regex = /^[^:]*/; // everything up to a `:` character

  const params: GetCallerIdentityCommandInput = {};

  const cmd = new GetCallerIdentityCommand(params);

  const res: GetCallerIdentityCommandOutput = await sts.send(cmd);

  const id: string = (regex.exec(res.UserId || '') || [])[0] || '';

  return id;
}

async function getSASL(): Promise<SASLOptions> {
  const sasl: SASLOptions = {
    mechanism: 'aws',
    authorizationIdentity: await getAuthorizationIdentity(),
    accessKeyId,
    secretAccessKey,
    sessionToken,
  };

  return sasl;
}

export { getSASL };
