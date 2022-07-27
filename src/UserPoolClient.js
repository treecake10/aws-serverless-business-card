import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDataClient = {
    UserPoolId: "us-east-1_Fhkym7V4D",
    ClientId: "40osn5g55ir19g8o45ttqtt9tj"
}

export default new CognitoUserPool(poolDataClient);