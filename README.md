# MTX Hackolympics 21

### PROBLEM B

#### PROBLEM

Write a simple web page + backend API (JS/HTML/CSS) that can be used to:

1. Provide a key and Google Cloud project
2. Encrypt it using a pre-configured secret via Mozilla SOPS in the backend
using its Google KMS flow.
3. Users should not be able to see any secret, only the encrypted content.
4. Bonus - If we can segregate the properties/features out in the admin portal
so that we clone those features for higher env with just different secrets keys.

#### DESIRED OUTCOME

- System should be able to encrypt all the secrets of a google cloud
project so that it can directly be used in deployment.
- Better if we can segregate out the features and properties as well
so that multiple GCP projects can be grouped together for different
env of a same Assignment/Project along with customisable property.
- Not required but good to have - If the system can clone and push
the properties (especially for features and services enablement) to
higher env with just secrets key update.
