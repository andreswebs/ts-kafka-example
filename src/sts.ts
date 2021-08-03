import {
  STSClient,
  GetSessionTokenCommand,
  GetSessionTokenCommandInput,
  GetSessionTokenCommandOutput
} from "@aws-sdk/client-sts";

const sts = new STSClient({ region: 'us-east-1' });

async function getSessionToken(duration = 900): Promise<GetSessionTokenCommandOutput> {

  const params: GetSessionTokenCommandInput = {
    DurationSeconds: duration,
  };

  const cmd = new GetSessionTokenCommand(params);

  return sts.send(cmd);

}

export { getSessionToken };
