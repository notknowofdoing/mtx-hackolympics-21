# MTX Hackolympics 21

### PROBLEM B

> Deployment and testing needs API keys
> But I can't share it with my collabs on Git? :(

### Enter GeaCPyy Deploy

Save yourself all the stress of leaking credentials and the FOMO (fear of missing out) on credential mods!

GeaCPyy Deploy requests your permission via Google's oAuth2 flow to access your Google Cloud Platform Resources. Then you provide a name, which creates the project and an API key. Does some backend magic with the help of [mozilla/sops](//github.com/mozilla/sops) and gives you an encrypted .json file that you can add to your project. You can use it from your local machine by importing it (as long as you are a member in the project, of course) where you are logged into Google's Cloud SDK! And undoubtedly, deploying to Google Cloud uses the environment to unlock your keys. Neat, huh?

### Technical stuff

1. It's incomplete
2. There comments throught the backend describing what is going on or rather should be going on
3. Resource/property selection is not implemented (or planned for implementation) to offer the user maximum flexibility.


### Why this problem statement?

It was the problem that gave us the most room for implementing and improving at the basics rather than an obscure usage or one that does not immediately serve us. As developers, we felt a closeness to the problem and discovery SOPS as a solution piqued our interest to use it further (including in the application itself). Another deciding factor was the extensibility offerred by Google's APIs and their good documentation.

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
