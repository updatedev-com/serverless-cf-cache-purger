# CloudFlare Cache Purger

This is a serverless function accountable to purge the CloudFlare Cache. It's triggered by an HTTP POST request.

It can help to automate cache purging after deploys and content publishing.

## Usage

### Deployment

Before deployment, create a `.env` file like the example bellow replacing `<ZONE_ID>` by the [`zone id`](https://community.cloudflare.com/t/how-to-find-cloudflare-zone-id-to-configure-it-with-wp-rocket/83131) you want purge and `<API_TOKEN>` by an [`API TOKEN`](https://developers.cloudflare.com/api/tokens/create#:~:text=To%20get%20started%20creating%20an,home%20screen%20select%20Create%20Token%20.) with purge permission.

```
CF_ZONE_ID=<ZONE_ID>
CF_API_TOKEN=<API_TOKEN>
```

In order to deploy, you need to run the following command:

```
$ npm install
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: DOTENV: Loading environment variables from .env:
Serverless: 	 - CF_ZONE_ID
Serverless: 	 - CF_API_TOKEN
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service serverless-cf-cache-purger.zip file to S3 (31.72 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................
Serverless: Stack update finished...
Service Information
service: serverless-cf-cache-purger
stage: dev
region: us-east-1
stack: serverless-cf-cache-purger-dev
resources: 11
api keys:
  None
endpoints:
  POST - https://o4te26vv1h.execute-api.us-east-1.amazonaws.com/purge
functions:
  purgeCloudFlare: serverless-cf-cache-purger-dev-purgeCloudFlare
layers:
  None
```

### Invocation

After successful deployment, you can invoke the deployed function by requesting the api gateway endpoint. Example:

```
$ curl -X POST https://9999999999.execute-api.us-east-1.amazonaws.com/purge
```

Which should result in response similar to the following:

```json
{
    "message": "OK"
}
```

### Local development

You can test locally running offline:

```
$ sls offline start
```

and in another terminal run:

```
$ curl -X POST http://localhost:3000/purge
```

Which should result in response similar to the following:

```json
{
    "message": "OK"
}
```
