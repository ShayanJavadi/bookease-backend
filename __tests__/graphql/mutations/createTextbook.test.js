import ApolloClient, {HttpLink} from "apollo-client-preset";
import gql from "graphql-tag";

test("return true", (done) => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:5000/graphql",
    }),
    fetchPolicy: 'network-only'
  });

  client.mutate({
    mutation: gql`mutation signIn {
        sendVerificationCodeToEmail(email:"aduyng@gmail.com")
    }`
  })
  .then(() => expect(3).toBe(5))
  .then(done);
  // expect(3).toBe(3);
});