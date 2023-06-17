
<body>
 <h1 style="display: flex; align-items: center;">
    <img src="https://github.com/ahmedHanzala/VaxWin/assets/105395393/09b64343-8fc4-40b4-b9ce-cd1b3d21c0b3" alt="VaxWin Logo" style="width: 70px; height: 70px; margin-right: 05px;">
    VaxWin - Vaccine Tracking Application for Children
  </h1>

  <h2>Features</h2>
  <ul>
    <li><strong>Vaccine Record Management</strong>: Parents can easily create and manage vaccination records for their children, including information about the vaccines received, dates, and dosage.</li>
    <li><strong>Immunization Schedule</strong>: The application provides an immunization schedule based on the child's age and provides reminders for upcoming vaccinations.</li>
    <li><strong>Secure Data Storage</strong>: Vaccination records are securely stored in the cloud using AWS services to ensure privacy and data integrity.</li>
    <li><strong>Ask Doctor</strong>: Users can chat with a live doctor to get the guidance that they need</li>
    <li><strong>At Home Vaccination</strong>: Users can also book at home vaccination service and medical personals will arrive at their location for vaccination.</li>
    <li><strong>Nearby Vaccination Centers</strong>: Users can search nearby vaccinations centers.</li>
    <li><strong>Notifications</strong>: Users receive timely notifications for upcoming vaccinations, ensuring that children receive their vaccines on time.</li>
    <li><strong>User-friendly Interface</strong>: The application offers an intuitive and user-friendly interface, making it easy for parents to navigate and manage their children's vaccination records.</li>
  </ul>
  <h2>Google Play Store</h2>
      <pre><code>PLAY STORE LINK: <a href=  "https://play.google.com/store/apps/details?id=com.ahmedhanzala.Vaccinify"> Click here to download VaxWin for android </a> </code></pre>
  <h2>Screenshots</h2>
   <img src="https://github.com/ahmedHanzala/VaxWin/assets/105395393/52a4fa1f-6feb-4ac8-b9cb-3c1bfc73c1a5" width="200" height="400" />
  <img src="https://github.com/ahmedHanzala/VaxWin/assets/105395393/405b5294-e71a-498a-86fe-f96a42d3bd18" width="200" height="400" />
   <img src="https://github.com/ahmedHanzala/VaxWin/assets/105395393/ae912485-91c4-4426-8fc9-dc8f8e39a646" width="200" height="400" />
    <img src="https://github.com/ahmedHanzala/VaxWin/assets/105395393/cdd24c3b-9142-44eb-a7ad-cdb392c0a994" width="200" height="400" />
  <img src="https://github.com/ahmedHanzala/VaxWin/assets/105395393/2e05ae96-7dbd-47e3-922d-4a674f5d5137" width="200" height="400" />
  <img src="https://github.com/ahmedHanzala/VaxWin/assets/105395393/9e3c3c42-15a5-46bf-a5e7-3124471adde6" width="200" height="400" />
    <h2>Main Screens</h2>
  <ul>
    <li><strong>Onboarding Screen</strong>: The initial screen that introduces the application to users. Users can navigate to the login or sign up screens using the provided arrows and HTML.</li>
    <li><strong>Login Screen</strong>: Allows users to log into their VaxWin accounts.</li>
    <li><strong>Sign Up Screen</strong>: Enables new users to create a VaxWin account.</li>
    <li><strong>Home Screen</strong>: Consists of a carasoul for latest vaccinations given, upcomming vaccination bookings, and booking new vaccines.</li>
    <li><strong>Calendar Screen</strong>: Tracks dates of vaccination for all children.</li>
    <li><strong>Add Child Screen</strong>: Allows users to add a child to their VaxWin account.</li>
    <li><strong>Book Vaccination Screen</strong>: Users can book an appointment for vaccine administration at a nearby vaccination center or at home.</li>
    <li><strong>Vaccination Centers Nearby Screen</strong>: Displays a list of vaccination centers located nearby.</li>
    <li><strong>Ask Doctor Screen</strong>: Provides live chat functionality with a certified doctor.</li>
    <li><strong>Latest News Screen</strong>: Shows the latest news and updates related to vaccines and child health.</li>
    <!-- Add more screens here -->
  </ul>
  

  <h2>Installation</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/ahmedHanzala/vaxwin.git</code></pre>
    </li>
    <li>Change into the project directory:
      <pre><code>cd vaxwin</code></pre>
    </li>
    <li>Install the dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Start the application:
      <pre><code>npm start</code></pre>
    </li>
  </ol>

  <p>This will start the React Native development server and provide you with options to run the application on a physical device or an emulator.</p>

  <h2>Backend Configuration</h2>
  <p>VaxWin uses AWS services for the backend. </p>
  <ol>
    <li>Create an AWS account if you don't already have one.</li>
    <li>Set up an S3 bucket to store user data securely.</li>
    <li>Set up an AWS Lambda function and API Gateway to handle backend APIs for user authentication, vaccine record management, and notifications.</li>
    <li>Configure the necessary environment variables in the application code, such as the AWS credentials, bucket name, API endpoints, etc.</li>
  </ol>

  <p>For detailed instructions on setting up the backend, refer to the documentation provided in the <code>backend</code> directory of the project.</p>

  <h2>Contributing</h2>
  <p>Contributions to VaxWin are welcome! To contribute to the project, please follow these guidelines:</p>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch for your feature or bug fix:
      <pre><code>git checkout -b feature/your-feature-name</code></pre>
    </li>
    <li>Make the necessary changes and commit them with descriptive commit messages.</li>
    <li>Push your changes to your forked repository:
      <pre><code>git push origin feature/your-feature-name</code></pre>
    </li>
    <li>Open a pull request on the main repository. Provide a clear description of your changes and the problem it solves.</li>
  </ol>

  <p>Please ensure that your code follows the project's coding standards and includes appropriate tests.</p>

  <h2>License</h2>
  <p>VaxWin is released under the <a href="LICENSE">MIT License</a>. Feel free to use, modify, and distribute the application according to the terms specified in the license.</p>

  <h2>Acknowledgements</h2>
  <ul>
    <li>We would like to express our gratitude to the open-source community for providing valuable resources and libraries that made this project possible.</li>
  </ul>

  <h2>Contact</h2>
  <p>If you have any questions or suggestions regarding VaxWin, feel free to contact the development team <a href="mailto:ahanzala.bscs20seecs@seecs.edu.pk"> Here. </a>.</p>

  <p>Thank you for your interest in VaxWin! Together, we can ensure a healthier future for children.</p>
</body>
