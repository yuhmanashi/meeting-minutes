# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Meeting.destroy_all


    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('meetings')
    
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    firstUser = User.create!(
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@user.io', 
      password: 'password'
    )
    5.times {
        |m| firstUser.meetings.create!(
          category: 'test' + m.to_s,
          student: 'student' + m.to_s,
          student_email: 'student' + m.to_s + '@student.io'
        )
    }

    # More users
    10.times {
      |n| 
      user = User.create!(
        first_name: 'Demo',
        last_name: 'User' + (n+1).to_s,
        email: 'demo' + (n+1).to_s + '@user.io', 
        password: 'password'
      )
      rand(1..10).times {
        |m| user.meetings.create!(
          category: 'test' + m.to_s,
          student: 'student' + m.to_s,
          student_email: 'student' + m.to_s + '@student.io'
        )
      }
    }
    # Meetings for Demo User

    puts "Done!"
end