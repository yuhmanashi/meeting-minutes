json.meetings do
  @meetings.each do |meeting|
    json.set! meeting.id do
      json.partial! 'meeting', meeting: meeting
    end
  end
end