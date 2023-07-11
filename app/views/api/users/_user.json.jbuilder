json.extract! user, :id, :email, :first_name, :last_name, :created_at, :updated_at

# json.meetings do
#     user.meetings.each do |meeting|
#         json.set! meeting.id do
#             json.extract! meeting, :id, :category, :name, :problems, :notes, :email, :user_id, :created_at, :updated_at
#         end
#     end
# end