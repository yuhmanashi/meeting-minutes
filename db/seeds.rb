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
    Student.destroy_all
    Meeting.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('meetings')
    
    puts "Creating coaches..."
    coaches = []
    10.times do
      coaches.push(Faker::Name.first_name)
    end

    puts "Creating students..."
    50.times {
      |n| 
      idx = n % 10
      first_name = Faker::Name.first_name
      Student.create!(
        first_name: first_name,
        last_name: Faker::Name.last_name,
        email: first_name + '@student.io',
        coach: coaches[idx]
      )
    }

    puts "Creating categories..."
    categories = [
      'Cat',
      'Dog',
      'Fish',
      'Bird',
      'Reptile',
      'Other'
    ]


    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    firstUser = User.create!(
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@user.io', 
      password: 'password'
    )
    10.times do
      firstUser.meetings.create!(
        category: categories[rand(0..categories.length - 1)],
        student_id: rand(1..50)
      )
    end

    # More users
    # 10.times {
    #   |n| 
    #   user = User.create!(
    #     first_name: 'Demo',
    #     last_name: 'User' + (n+1).to_s,
    #     email: 'demo' + (n+1).to_s + '@user.io', 
    #     password: 'password'
    #   )
    #   rand(1..10).times {
    #     |m| user.meetings.create!(
    #       name: 'student' + m.to_s,
    #       email: 'student' + m.to_s + '@student.io'
    #     )
    #   }
    # }
    # Meetings for Demo User

    puts "Done!"
end