json.extract! user, :id, :email, :first_name, :last_name

# json.meetings do
#     user.meetings.each do |meeting|
#         json.set! meeting.id do
#             json.partial! 'api/meetings/meeting', meeting: meeting
#         end
#     end
# end

# json.pins do
#     user.pins.each do |pin|
#         json.set! pin.id do
#             json.partial! 'api/pins/pin', pin: pin
#         end
#     end
# end