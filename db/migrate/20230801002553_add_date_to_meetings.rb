class AddDateToMeetings < ActiveRecord::Migration[7.0]
  def change
    add_column :meetings, :date, :datetime
  end
end
