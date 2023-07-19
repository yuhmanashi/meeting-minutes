class CreateWatchlists < ActiveRecord::Migration[7.0]
  def change
    create_table :watchlists do |t|
      t.belongs_to :user, index: true, foreign_key: true, null: false
      t.references :student
      t.text :note
      t.string :title
      
      t.timestamps
    end
  end
end
