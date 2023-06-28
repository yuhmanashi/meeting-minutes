@meetings.each do |meeting|
    json.set! meeting.id do
      json.partial! 'meeting', meeting: meeting
      json.extract! meeting.user, :first_name, :last_name
    end
end