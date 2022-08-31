import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDataClient = {
    UserPoolId: "us-east-1_wYe2n60iR",
    ClientId: "7p8ld5bcopaqq2l9spheqv45re"
}

export default new CognitoUserPool(poolDataClient);