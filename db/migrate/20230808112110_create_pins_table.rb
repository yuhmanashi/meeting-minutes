class CreatePinsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :pins do |t|
      t.integer :author_id, index: true, null: false
      t.string :title, null: false
      t.text :body, null: false
      
      t.timestamps
    end
  end
end
