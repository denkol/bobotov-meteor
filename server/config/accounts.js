/* global Assets */
import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser((options, user) => {
  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile
  }

  return user
})

Accounts.onLogin((attempt) => {
  if (attempt.user) {
    const user = attempt.user

    // lastLoginAt
    Meteor.users.update(user._id, {
      $set: {
        lastLoginAt: new Date()
      }
    })
  }
})

Accounts.emailTemplates.siteName = 'Bobotov'
Accounts.emailTemplates.from = 'noreply@bobotov.me'

Accounts.emailTemplates.verifyEmail.subject = () => 'Welcome to Website'
Accounts.emailTemplates.verifyEmail.text = false
Accounts.emailTemplates.verifyEmail.html = (user, verifyEmailUrl) => (`
  <p>Hello ${user.profile.name}</p>
  <p><a href="${verifyEmailUrl}">Get started</a></p>
`)

Accounts.emailTemplates.enrollAccount.subject = () => 'You have been invited to join Website'
Accounts.emailTemplates.enrollAccount.text = false
Accounts.emailTemplates.enrollAccount.html = (user, enrollAccountUrl) => (`
  <p>Hello ${user.profile.name}</p>
  <p><a href="${enrollAccountUrl}">Get started</a></p>
`)

Accounts.emailTemplates.resetPassword.subject = () => 'Reset Password on Website'
Accounts.emailTemplates.resetPassword.text = false
Accounts.emailTemplates.resetPassword.html = (user, resetPasswordUrl) => (`
  <p>Hello ${user.profile.name}</p>
  <p><a href="${resetPasswordUrl}">Reset Password</a></p>
`)

Accounts.urls.resetPassword = token => Meteor.absoluteUrl(`reset-password/${token}`)
Accounts.urls.verifyEmail = token => Meteor.absoluteUrl(`verify-email/${token}`)
Accounts.urls.enrollAccount = token => Meteor.absoluteUrl(`enroll-account/${token}`)
