class CreateMeetings < ActiveRecord::Migration[7.0]
  def change
    create_table :meetings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :email, null: false
      t.string :name, null: false
      t.string :category
      t.string :problems
      t.text :notes

      t.timestamps
    end

    add_index :meetings, :name
    add_index :meetings, :email
  end
end
