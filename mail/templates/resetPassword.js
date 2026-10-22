exports.passwordUpdate = (email, name, url) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Reset Request</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .cta-button {
                display: inline-block;
                padding: 12px 24px;
                margin: 20px 0;
                background-color: #FFD60A; /* StudyNotion Yellow Accent */
                color: #000814 !important;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                font-size: 16px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }

            .break-link {
                word-break: break-all;
                font-size: 14px;
                color: #118AB2;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Password Reset Request</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>We received a request to reset your password for the account associated with <span class="highlight">${email}</span>.</p>
                <p>Please click the button below to complete your password reset process. This link is only valid for a limited time.</p>
                
                <!-- Action Button -->
                <a class="cta-button" href="${url}" target="_blank">Reset Password</a>
                
                <p>If the button doesn't work, you can copy and paste this link directly into your browser:</p>
                <p class="break-link"><a href="${url}">${url}</a></p>
                <p>If you did not make this request, you can safely ignore this email; your current password will remain unchanged.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;  
};
