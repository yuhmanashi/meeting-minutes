# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#Destroy all tables without seeding

# ApplicationRecord.transaction do
#    puts "Destroying tables..."
#    # Unnecessary if using `rails db:seed:replant`
#    User.destroy_all
#    Student.destroy_all
#    Meeting.destroy_all
#    Watchlist.destroy_all

#    puts "Resetting primary keys..."
#    # For easy testing, so that after seeding, the first `User` has `id` of 1
#    ApplicationRecord.connection.reset_pk_sequence!('users')
#    ApplicationRecord.connection.reset_pk_sequence!('meetings')
#    ApplicationRecord.connection.reset_pk_sequence!('students')
#    ApplicationRecord.connection.reset_pk_sequence!('watchlists')

#    puts "Done!"
# end

require 'faker'
require 'date'

ApplicationRecord.transaction do 
    # puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    # User.destroy_all
    # Student.destroy_all
    # Meeting.destroy_all
    # Watchlist.destroy_all
    # Pin.destroy_all

    # puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('meetings')
    ApplicationRecord.connection.reset_pk_sequence!('students')
    ApplicationRecord.connection.reset_pk_sequence!('watchlists')
    ApplicationRecord.connection.reset_pk_sequence!('pins')

    puts "Creating coaches..."
    coaches = []
    10.times do
      coaches.push(Faker::Name.first_name + ' ' + Faker::Name.last_name)
    end

    puts "Creating students..."
    num_students = 30
    
    num_students.times {
      |n| 
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name
      full_name = first_name + ' ' + last_name
      Student.create!(
        first_name: first_name,
        last_name: last_name,
        full_name: full_name,
        email: Faker::Internet.email(name: full_name, domain: 'example.com'),
        coach: coaches[rand(0..9)]
      )
    }

    puts "Creating categories..."
    categories = [
      'DS&A',
      'Systems Design',
      'Tech Trivia',
      'Practical Skill',
      'Debugging',
      'Walkthrough',
      'Other'
    ]
    # categories = []
    # rand(5..8).times do
    #   categories.push(Faker::Science.unique.science)
    # end

    puts "Creating first user..."
    # Create one user with an easy to remember username, email, and password:
    firstUser = User.create!(
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@user.io', 
      password: 'password'
    )

    puts "Creating meetings for first user..."
    150.times do
      firstUser.meetings.create!(
        category: categories[rand(0..(categories.length - 1))],
        student_id: rand(1..num_students),
        date: DateTime.new(2023, rand(8..12), rand(1..30) + rand().round(1)),
        notes: Faker::Lorem.sentences(number: rand(1..3)).join(' '),
        problems: Faker::Lorem.word
      )
    end

    50.times do
      firstUser.meetings.create!(
        category: categories[rand(0..(categories.length - 1))],
        student_id: rand(1..num_students),
        date: DateTime.new(2024, rand(1..2), rand(1..30) + rand().round(1)),
        notes: Faker::Lorem.sentences(number: rand(1..3)).join(' '),
        problems: Faker::Lorem.word
      )
    end

    # puts "Creating watchlist for first user..."
    # tags = ['a', 'b', 'c', 'd', 'e']
    
    # set = Set.new

    # 5.times do
    #   student_id = rand(1..num_students);
    #   tag = tags[rand(0..(tags.length - 1))];
    #   val = student_id.to_s + tag;

    #   while set.include?(val) do
    #     student_id = rand(1..num_students);
    #     tag = tags[rand(0..(tags.length - 1))];
    #     val = student_id.to_s + tag;
    #   end

    #   set.add(val)

    #   firstUser.watchlists.create!(
    #     student_id: student_id,
    #     tag: tag
    #   )
    # end

    colors = [
      '#fbe3e6',
      '#ebd6e7',
      '#f5d6dc',
      '#ddd9e6',
      '#d6f8ff',
      '#faedd7',
      '#d0ecea',
      '#fbfbde',
    ]

    rand(10..20).times do 
      firstUser.pins.create!(
        title: Faker::Company.bs,
        body: Faker::Quote.matz,
        color: colors[rand(0..(colors.length - 1))],
      )
    end
    
    puts "Creating more users..."
    # More users
    5.times {
      |n| 
      user = User.create!(
        first_name: 'Demo',
        last_name: 'User' + (n+1).to_s,
        email: 'demo' + (n+1).to_s + '@user.io', 
        password: 'password'
      )
      
      set = Set.new
      # 5.times do
      #   user.meetings.create!(
      #     category: categories[rand(0..(categories.length - 1))],
      #     student_id: rand(1..num_students),
      #     date: Date.new(2023, rand(8..12), rand(2..30))
      #   )
        
      #   student_id = rand(1..num_students);
      #   tag = tags[rand(0..(tags.length - 1))];
      #   val = student_id.to_s + tag;

      #   while set.include?(val) do
      #     student_id = rand(1..num_students);
      #     tag = tags[rand(0..(tags.length - 1))];
      #     val = student_id.to_s + tag;
      #   end

      #   set.add(val)

        # user.watchlists.create!(
        #   student_id: student_id,
        #   tag: tag
        # )
      # end

      Pin.create!(
        author_id: user.id,
        title: user.first_name,
        body: user.last_name,
        color: 'red'
      )
    }

    puts "Done!"
end