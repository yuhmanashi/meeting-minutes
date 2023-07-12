class ChangeMeetings < ActiveRecord::Migration[7.0]
  def change
    remove_column :meetings, :email, :string, null: false
    remove_column :meetings, :name, :string, null: false
    add_reference :meetings, :student, null: false
  end
end
